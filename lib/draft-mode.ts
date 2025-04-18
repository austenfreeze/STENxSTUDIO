import { draftMode } from "next/headers"

export async function getDraftMode() {
  try {
    // Try the async version first (Next.js 15+)
    try {
      const draftModeData = await draftMode()
      return { isEnabled: draftModeData?.isEnabled || false }
    } catch (asyncError) {
      console.error("Error getting draft mode asynchronously:", asyncError)

      // Fall back to synchronous version (Next.js 14 and earlier)
      try {
        const syncDraftMode = draftMode()
        return { isEnabled: syncDraftMode?.isEnabled || false }
      } catch (syncError) {
        console.error("Error getting draft mode synchronously:", syncError)
        return { isEnabled: false }
      }
    }
  } catch (error) {
    console.error("Error in getDraftMode:", error)
    return { isEnabled: false }
  }
}

export async function enableDraftMode() {
  try {
    // Try the async version first (Next.js 15+)
    try {
      const draft = await draftMode()
      await draft.enable()
      return true
    } catch (asyncError) {
      console.error("Error enabling draft mode asynchronously:", asyncError)

      // Fall back to synchronous version (Next.js 14 and earlier)
      try {
        const syncDraft = draftMode()
        syncDraft.enable()
        return true
      } catch (syncError) {
        console.error("Error enabling draft mode synchronously:", syncError)
        return false
      }
    }
  } catch (error) {
    console.error("Error in enableDraftMode:", error)
    return false
  }
}

export async function disableDraftMode() {
  try {
    // Try the async version first (Next.js 15+)
    try {
      const draft = await draftMode()
      await draft.disable()
      return true
    } catch (asyncError) {
      console.error("Error disabling draft mode asynchronously:", asyncError)

      // Fall back to synchronous version (Next.js 14 and earlier)
      try {
        const syncDraft = draftMode()
        syncDraft.disable()
        return true
      } catch (syncError) {
        console.error("Error disabling draft mode synchronously:", syncError)
        return false
      }
    }
  } catch (error) {
    console.error("Error in disableDraftMode:", error)
    return false
  }
}
