import { LinkIcon } from '@sanity/icons'
import { Stack, Text, Tooltip } from '@sanity/ui'
import { useEffect, useState } from 'react'
import { useClient } from 'sanity'
import styled from 'styled-components'
import { PortableTextMarkComponentProps } from '@portabletext/react'

type ReferenceData = {
  title?: string
  slug?: string
}

// Sleep function
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const InternalLinkRenderer: React.FC<PortableTextMarkComponentProps<{
  reference: { _ref: string }
}>> = (props) => {
  const client = useClient({ apiVersion: '2022-10-31' })

  const [reference, setReference] = useState<ReferenceData>({})

  useEffect(() => {
    const query = `*[_id == $rev]{title, 'slug': slug.current}[0]`
    const params = { rev: props.value.reference?._ref }

    let subscription: { unsubscribe: () => void } | undefined

    const fetchReference = async (listening = false) => {
      if (listening) await sleep(1500)
      try {
        const res = await client.fetch(query, params)
        setReference(res)
      } catch (err: any) {
        console.error(err.message)
      }
    }

    const listen = () => {
      subscription = client
        .listen(query, params, { visibility: 'query' })
        .subscribe(() => fetchReference(true))
    }

    fetchReference().then(listen)

    return () => {
      if (subscription) subscription.unsubscribe()
    }
  }, [client, props.value.reference?._ref])

  return (
    <Tooltip
      content={
        <Stack space={2} padding={3}>
          <Text align="center" size={1}>
            {reference.title || 'No title found'}
          </Text>
          <Text align="center" size={1} muted>
            {reference.slug ? `Slug: /${reference.slug}` : ''}
          </Text>
        </Stack>
      }
      fallbackPlacements={['right', 'left']}
      placement="bottom"
      portal
    >
      <InlineAnnotation>
        <LinkIcon /> {props.renderDefault(props)}
      </InlineAnnotation>
    </Tooltip>
  )
}

const InlineAnnotation = styled.span`
  padding-left: 0.3em;
  padding-right: 0.2em;
`

export default InternalLinkRenderer
