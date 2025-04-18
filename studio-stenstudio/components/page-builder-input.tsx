"use client"

import React, { useState } from "react"
import { Box, Card, Flex, Stack, Text, Button, TabList, Tab, TabPanel } from "@sanity/ui"
import { FormField } from "sanity"
import { EditIcon, EyeOpenIcon } from "@sanity/icons"

// This is a custom input component for Sanity Studio
export const PageBuilderInput = React.forwardRef((props, ref) => {
  const {
    type, // Schema information
    value, // Current field value
    onChange, // Method to handle changes
    focusPath, // Current focus path
    onFocus, // Method to handle focus
    onBlur, // Method to handle blur
    markers, // Validation markers
    presence, // Presence information for collaborative editing
    compareValue, // Value to check for "edited" functionality
    readOnly, // Boolean if field is not editable
    filterField, // Method to filter out parts of the value
    level, // Current level
    renderDefault, // Default rendering method
  } = props

  const [activeTab, setActiveTab] = useState("form")

  // Handle preview mode
  const handlePreviewClick = () => {
    // Get the document ID from the form context
    const documentId = props.path[0]._key
    const documentType = props.schemaType.name

    // Open preview in new tab
    const previewUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/studio-preview/${documentType}/${documentId}?preview=true&secret=${process.env.SANITY_PREVIEW_SECRET}`
    window.open(previewUrl, "_blank")
  }

  return (
    <FormField
      title={type.title}
      description={type.description}
      __unstable_markers={markers}
      __unstable_presence={presence}
      compareValue={compareValue}
      level={level}
    >
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Flex>
            <TabList space={2}>
              <Tab
                aria-controls="form-panel"
                id="form-tab"
                label="Form"
                onClick={() => setActiveTab("form")}
                selected={activeTab === "form"}
                space={2}
                icon={EditIcon}
              />
              <Tab
                aria-controls="preview-panel"
                id="preview-tab"
                label="Preview"
                onClick={() => setActiveTab("preview")}
                selected={activeTab === "preview"}
                space={2}
                icon={EyeOpenIcon}
              />
            </TabList>

            <Box flex={1} />

            <Button fontSize={1} icon={EyeOpenIcon} mode="ghost" onClick={handlePreviewClick} text="Open Preview" />
          </Flex>

          <TabPanel aria-labelledby="form-tab" hidden={activeTab !== "form"} id="form-panel">
            {renderDefault({
              ...props,
              ref,
            })}
          </TabPanel>

          <TabPanel aria-labelledby="preview-tab" hidden={activeTab !== "preview"} id="preview-panel">
            <Card padding={4} radius={2} tone="primary">
              <Flex direction="column" align="center" justify="center">
                <Text size={1}>Preview will open in a new tab</Text>
                <Button
                  fontSize={2}
                  icon={EyeOpenIcon}
                  mode="ghost"
                  onClick={handlePreviewClick}
                  text="Open Preview"
                  tone="primary"
                />
              </Flex>
            </Card>
          </TabPanel>
        </Stack>
      </Card>
    </FormField>
  )
})

PageBuilderInput.displayName = "PageBuilderInput"
