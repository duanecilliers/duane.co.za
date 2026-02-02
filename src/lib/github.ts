interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
    }>;
  };
  created_at: string;
}

export interface GitHubCommit {
  repo: string;
  message: string;
  date: string;
  url: string;
}

export async function getRecentActivity(
  username: string
): Promise<GitHubCommit[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/users/${username}/events/public`,
    { headers }
  );

  if (!response.ok) return [];

  const events: GitHubEvent[] = await response.json();

  const commits: GitHubCommit[] = [];

  for (const event of events) {
    if (event.type !== "PushEvent" || !event.payload.commits) continue;

    for (const commit of event.payload.commits) {
      commits.push({
        repo: event.repo.name.replace(`${username}/`, ""),
        message: commit.message.split("\n")[0], // first line only
        date: event.created_at,
        url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
      });

      if (commits.length >= 5) return commits;
    }
  }

  return commits;
}
