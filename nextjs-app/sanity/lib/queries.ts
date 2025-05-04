import {defineQuery} from "next-sanity"

export const integrationsQuery = defineQuery(`
  *[_type == "integrations" && _id == "singleton-integrations"][0]{
    projectName,
    projectSlug,
    primaryDomain,
    projectLead,
    internalNotes,

    sanity->{
      projectId,
      dataset,
      studioUrl,
      previewUrl,
      studioVersion,
      clientVersion,
      lastDeployed
    },
    vercel->{
      projectName,
      deploymentUrl,
      dashboardUrl,
      team,
      domains,
      lastCommit
    },
    github->{
      repoUrl,
      org,
      defaultBranch,
      lastCommitSha,
      webhookUrl
    }
  }
`)
