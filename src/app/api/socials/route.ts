import { NextApiRequest, NextApiResponse } from "next";

type SocialProps = {
  socialId: string;
  socialName: string;
  socialImage: string;
  socialLink: string;
};

export type SocialsImplementation = SocialProps[];

async function getAllSocials(): Promise<SocialsImplementation | null> {
  let formattedData: any;
  await fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1_LO4wvheOiAJKwDEMxtF1YBDbBlIDv7mLnjAqbdy5QY/values/Socials!A2:D",
    {
      method: "GET",
      headers: {
        "x-goog-api-key": process.env.GOOGLE_API_KEY || "",
      },
      next: {
        revalidate: 3600,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      formattedData = data.values.map((row: string[]) => {
        return {
          socialId: row[0],
          socialName: row[1],
          socialImage: row[2],
          socialLink: row[3],
        };
      });

      console.log(formattedData);
    })
    .catch((error) => {
      console.error(error);
    });

  if (formattedData) {
    return Promise.resolve(formattedData);
  }

  return Promise.resolve(null);
}

// Define a route to get all projects
export async function GET() {
  try {
    console.log("GET /api/socials");
    const socials = await getAllSocials();
    if (socials) {
      return Response.json({
        socials: socials,
        message: "success",
      });
    } else {
      throw new Error("Failed to get socials");
    }
  } catch (error) {
    return Response.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    );
  }
}
