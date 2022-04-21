@bender-tags: 4.19.0, bug, 5095
@bender-ui: collapsed
@bender-ckeditor-plugins: wysiwygarea, sourcearea, clipboard, undo, image, floatingspace

**Note:** Make sure the notification was closed/disappeared after the step which shows it.

1. Drag and drop, into the editor, file in a format unsupported by the editor eg. [JPEG2000](_assets/logo.jp2).

**Expected** Notification with "This file format is not supported." message is displayed.

**Unexpected** Nothing happens.

2. Click the `Ignore notification for .jp2 extension` button and repeat step `1`.

**Expected** Notification does not appear.

**Unexpected** Notification with "This file format is not supported." message is still displayed.

3. Drag and drop different file unsupported by the editor and `.jp2` eg. [pasteimagehtml.pptx](_assets/pasteimagehtml.pptx).

**Expected** Notification with "This file format is not supported." message is displayed.

**Expected** Notification is gone.

4. Click `Set defaults` button and repeat above steps for the inline editor.

5. Click `Set defaults` and repeat steps `1`-`4` but use copy/paste file instead of drag and drop.