import { NextApiRequest, NextApiResponse } from "next";

type project = {
  projectId: string;
  projectName: string;
  projectDescription: string;
  projectTags: string;
  projectLink: string;
};

export type ProjectsImplementation = project[];

async function getAllProjects(): Promise<ProjectsImplementation | null> {
  let formattedData: any;
  
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SPREADSHEET_ID}/values/Projects!A2:E`,
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
          projectId: row[0],
          projectName: row[1],
          projectDescription: row[2],
          projectTags: row[3],
          projectLink: row[4],
        };
      });

    })
    .catch((error) => {
      console.error(error);
    });

  if (formattedData) {
    return Promise.resolve(formattedData);
  }

  return Promise.resolve(null);;
}

// Define a route to get all projects
export async function GET() {
  try {
    const projects = await getAllProjects();
    if (projects) {
      return Response.json({
        projects: projects,
        message: "success",
      });
    } else {
      throw new Error("Failed to get projects");
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
