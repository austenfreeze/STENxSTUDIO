import React from 'react'
import { LaunchIcon } from '@sanity/icons'
import { Tooltip, Box, Text, Stack } from '@sanity/ui'
import { PortableTextMarkComponentProps } from '@portabletext/react'
import styled from 'styled-components'

const ExternalLinkRenderer: React.FC<PortableTextMarkComponentProps<{
  href: string
}>> = (props) => {
  const { href } = props.value

  return (
    <Tooltip
      content={
        <Box padding={3}>
          <Stack space={2}>
            <Text align="center" size={1}>
              {href || 'No URL found'}
            </Text>
          </Stack>
        </Box>
      }
      placement="bottom"
      fallbackPlacements={['right', 'left']}
      portal
    >
      <InlineAnnotation>
        <LaunchIcon /> {props.renderDefault(props)}
      </InlineAnnotation>
    </Tooltip>
  )
}

const InlineAnnotation = styled.span`
  padding-left: 0.3em;
  padding-right: 0.2em;
`

export default ExternalLinkRenderer
