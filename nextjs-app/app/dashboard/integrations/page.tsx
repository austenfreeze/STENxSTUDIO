import {client} from '@/sanity/lib/client'
import {integrationsQuery} from '@/sanity/lib/queries'
import SafeExternalLink from '@/app/components/SafeExternalLink'

export default async function IntegrationsDashboard() {
  const data = await client.fetch(integrationsQuery)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground text-sm">
          A snapshot of all connected platforms and deployment metadata.
        </p>
      </div>

      {/* Sanity Card */}
      <section className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold">🧠 Sanity</h2>
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between border-b py-1">
            <dt>Project ID</dt>
            <dd className="text-right font-mono">{data?.sanity?.projectId}</dd>
          </div>
          <div className="flex justify-between border-b py-1">
            <dt>Dataset</dt>
            <dd className="text-right font-mono">{data?.sanity?.dataset}</dd>
          </div>
          <div className="flex justify-between border-b py-1">
            <dt>Studio URL</dt>
            <dd>
              <SafeExternalLink href={data?.sanity?.studioUrl}>Open Studio</SafeExternalLink>
            </dd>
          </div>
          <div className="flex justify-between border-b py-1">
            <dt>Preview Origin</dt>
            <dd className="text-right font-mono">
              {data?.sanity?.previewUrl || <span className="text-gray-400 italic">Not available</span>}
            </dd>
          </div>
          <div className="flex justify-between border-b py-1">
            <dt>Last Deploy</dt>
            <dd className="text-right font-mono">
              {data?.sanity?.lastDeployed?.slice(0, 10) || '—'}
            </dd>
          </div>
        </dl>
      </section>

      {/* Vercel Card */}
      <section className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold">▲ Vercel</h2>
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between border-b py-1">
            <dt>Project</dt>
            <dd className="text-right font-mono">{data?.vercel?.projectName}</dd>
          </div>
          <div className="flex justify-between border-b py-1">
            <dt>Team</dt>
            <dd className="text-right">{data?.vercel?.team}</dd>
          </div>
          <div className="flex justify-between border-b py-1">
            <dt>Domains</dt>
            <dd className="text-right font-mono truncate">
              {data?.vercel?.domains?.join(', ') || (
                <span className="text-gray-400 italic">None listed</span>
              )}
            </dd>
          </div>
          <div className="flex justify-between border-b py-1">
            <dt>Last Commit</dt>
            <dd className="text-right font-mono text-xs truncate">
              {data?.vercel?.lastCommit || '—'}
            </dd>
          </div>
        </dl>
      </section>

      {/* GitHub Card */}
      <section className="rounded-xl border border-gray-200 p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold">🐙 GitHub</h2>
        <dl className="mt-3 space-y-1 text-sm">
          <div className="flex justify-between border-b py-1">
            <dt>Repo</dt>
            <dd>
              <SafeExternalLink href={data?.github?.repoUrl}>View Repo</SafeExternalLink>
            </dd>
          </div>
          <div className="flex justify-between border-b py-1">
            <dt>Branch</dt>
            <dd className="text-right font-mono">{data?.github?.defaultBranch || '—'}</dd>
          </div>
          <div className="flex justify-between border-b py-1">
            <dt>Last Commit SHA</dt>
            <dd className="text-right font-mono text-xs truncate">
              {data?.github?.lastCommitSha || '—'}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
