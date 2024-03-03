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
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SPREADSHEET_ID}/values/Socials!A2:D`,
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
