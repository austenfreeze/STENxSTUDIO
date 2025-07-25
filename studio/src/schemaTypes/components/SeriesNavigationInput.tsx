// studio/components/SeriesNavigationInput.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  ObjectInputProps,
  set,
  unset,
  useClient,
  useFormValue,
} from 'sanity';
import { Stack, Box, Text, Card, Button, Select, Flex, Label, Spinner } from '@sanity/ui';
import { Reference } from '@sanity/types'; // Import Reference type

// Define a type for a simplified magazine issue for dropdowns
interface SimpleMagazineIssue {
  _id: string;
  title: string;
  issueNumber: string;
  publicationDate: string;
}

// Props for our custom input component
// It extends ObjectInputProps because 'seriesNavigation' is an object type
export default function SeriesNavigationInput(props: ObjectInputProps) {
  const { onChange, value } = props;

  // Access the Sanity client to fetch documents
  const client = useClient({ apiVersion: '2023-08-01' });

  // Get the ID of the current document (the magazineIssue being edited)
  // useFormValue provides access to the current document's fields
  const currentDocumentId = useFormValue(['_id']) as string | undefined;
  const currentMagazineTitle = useFormValue(['magazine', 'title']) as string | undefined;
  const currentIssueTitle = useFormValue(['title']) as string | undefined;
  const currentIssueNumber = useFormValue(['issueNumber']) as string | undefined;
  const currentPublicationDate = useFormValue(['publicationDate']) as string | undefined;


  const [allIssues, setAllIssues] = useState<SimpleMagazineIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the currently selected previous and next issue references from the value
  const previousIssueRef = value?.previousIssue as Reference | undefined;
  const nextIssueRef = value?.nextIssue as Reference | undefined;

  // Fetch all magazine issues when the component mounts or currentDocumentId changes
  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all magazineIssue documents
        const issues: SimpleMagazineIssue[] = await client.fetch(
          `*[_type == "magazineIssue"]{
            _id,
            title,
            issueNumber,
            publicationDate,
            // Fetch magazine title for better context in the dropdown
            "magazineTitle": magazine->title
          }`
        );

        // Filter out the current document from the list
        const filteredIssues = issues.filter(issue => issue._id !== currentDocumentId);
        setAllIssues(filteredIssues);
      } catch (err) {
        console.error('Failed to fetch magazine issues:', err);
        setError('Failed to load issues. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (currentDocumentId) {
      fetchIssues();
    }
  }, [client, currentDocumentId]);

  // Handle changes to the previous issue selection
  const handlePreviousIssueChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (selectedId) {
      onChange(set({ _ref: selectedId, _type: 'reference' }, ['previousIssue']));
    } else {
      onChange(unset(['previousIssue']));
    }
  }, [onChange]);

  // Handle changes to the next issue selection
  const handleNextIssueChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    if (selectedId) {
      onChange(set({ _ref: selectedId, _type: 'reference' }, ['nextIssue']));
    } else {
      onChange(unset(['nextIssue']));
    }
  }, [onChange]);

  // Helper to format issue display for dropdowns and current selection
  const formatIssueDisplay = (issue: SimpleMagazineIssue) => {
    const date = issue.publicationDate
      ? new Date(issue.publicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
      : '';
    return `${issue.magazineTitle ? `[${issue.magazineTitle}] ` : ''}${issue.title} (${issue.issueNumber}${date ? `, ${date}` : ''})`;
  };

  // Find the full details of the currently selected previous/next issues for display
  const currentPreviousIssue = allIssues.find(issue => issue._id === previousIssueRef?._ref);
  const currentNextIssue = allIssues.find(issue => issue._id === nextIssueRef?._ref);


  return (
    <Stack space={3}>
      {props.renderDefault(props)} {/* Render default Sanity input for fallback/consistency */}

      <Card padding={3} radius={2} shadow={1} tone="primary">
        <Stack space={3}>
          <Text size={1} weight="semibold">Series Navigation (Custom Input)</Text>
          <Text size={2}>
            Current Issue: <Text as="span" weight="bold">{currentIssueTitle || 'N/A'}</Text>
            {currentIssueNumber && <Text as="span"> (No. {currentIssueNumber})</Text>}
            {currentMagazineTitle && <Text as="span"> from {currentMagazineTitle}</Text>}
            {currentPublicationDate && <Text as="span"> ({new Date(currentPublicationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })})</Text>}
          </Text>

          {loading && (
            <Flex align="center" justify="center" padding={4}>
              <Spinner />
              <Box marginLeft={3}>
                <Text muted>Loading issues...</Text>
              </Box>
            </Flex>
          )}

          {error && (
            <Card padding={3} tone="critical" radius={2}>
              <Text size={1}>{error}</Text>
            </Card>
          )}

          {!loading && !error && (
            <Flex direction="column" gap={3}>
              <Box>
                <Label htmlFor="previous-issue-select" size={1} style={{ marginBottom: '0.5rem', display: 'block' }}>
                  Previous Issue in Series:
                </Label>
                <Select
                  id="previous-issue-select"
                  value={previousIssueRef?._ref || ''}
                  onChange={handlePreviousIssueChange}
                  disabled={allIssues.length === 0}
                >
                  <option value="">-- Select Previous Issue --</option>
                  {allIssues.map((issue) => (
                    <option key={issue._id} value={issue._id}>
                      {formatIssueDisplay(issue)}
                    </option>
                  ))}
                </Select>
                {currentPreviousIssue && (
                  <Text size={1} muted style={{ marginTop: '0.5rem' }}>
                    Currently linked: {formatIssueDisplay(currentPreviousIssue)}
                  </Text>
                )}
              </Box>

              <Box>
                <Label htmlFor="next-issue-select" size={1} style={{ marginBottom: '0.5rem', display: 'block' }}>
                  Next Issue in Series:
                </Label>
                <Select
                  id="next-issue-select"
                  value={nextIssueRef?._ref || ''}
                  onChange={handleNextIssueChange}
                  disabled={allIssues.length === 0}
                >
                  <option value="">-- Select Next Issue --</option>
                  {allIssues.map((issue) => (
                    <option key={issue._id} value={issue._id}>
                      {formatIssueDisplay(issue)}
                    </option>
                  ))}
                </Select>
                {currentNextIssue && (
                  <Text size={1} muted style={{ marginTop: '0.5rem' }}>
                    Currently linked: {formatIssueDisplay(currentNextIssue)}
                  </Text>
                )}
              </Box>
            </Flex>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
