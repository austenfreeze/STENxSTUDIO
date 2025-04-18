"use client"
import { Box, Button, Flex, Tooltip } from "@sanity/ui"
import { EarthGlobeIcon, EditIcon } from "@sanity/icons"

export function StudioNavbar(props) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  return (
    <Flex padding={4} gap={2} align="center">
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Tooltip content="View website" placement="bottom">
        <Button
          mode="ghost"
          tone="primary"
          icon={EarthGlobeIcon}
          text="View Website"
          onClick={() => window.open(baseUrl, "_blank")}
        />
      </Tooltip>
      <Tooltip content="Visual edit mode" placement="bottom">
        <Button
          mode="ghost"
          tone="primary"
          icon={EditIcon}
          text="Visual Edit"
          onClick={() => {
            // Get current document info
            const documentId = window.location.pathname.split(";")[1]
            const documentType = window.location.pathname.split("/").pop().split(";")[0]

            if (documentId && documentType) {
              const previewUrl = `${baseUrl}/studio-preview/${documentType}/${documentId}?preview=true&secret=${process.env.SANITY_PREVIEW_SECRET}`
              window.open(previewUrl, "_blank")
            } else {
              window.open(
                `${baseUrl}/studio-preview?preview=true&secret=${process.env.SANITY_PREVIEW_SECRET}`,
                "_blank",
              )
            }
          }}
        />
      </Tooltip>
    </Flex>
  )
}
