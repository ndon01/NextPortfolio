import { NextApiRequest, NextApiResponse } from "next";

type SkillProps = {
    skillId: string;
    skillName: string;
    skillDescription: string;
};

export type SkillsImplementation = SkillProps[];

async function getAllSkills(): Promise<SkillsImplementation | null> {
  let formattedData: any;
  await fetch(
    "https://sheets.googleapis.com/v4/spreadsheets/1_LO4wvheOiAJKwDEMxtF1YBDbBlIDv7mLnjAqbdy5QY/values/Skills!A2:C30",
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
          skillId: row[0],
          skillName: row[1],
            skillDescription: row[2],
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
    console.log("GET /api/skills");
    const skills = await getAllSkills();
    if (skills) {
      return Response.json({
        skills: skills,
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
