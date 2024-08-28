import { mergeAttributes, Node } from '@tiptap/core'
import type { UploadParams } from '../uploaders/types'
import { defaultMarkdownSerializer } from 'prosemirror-markdown'

export interface VideoAttributes {
  src: string
  alt: string
  sha256: string
  file: File
  uploading: boolean
  uploadError: string
  uploadType: UploadParams['type']
  uploadUrl: UploadParams['url']
}

export const VideoExtension = Node.create({
  name: 'video',

  inline: false,

  group: 'block',

  atom: true,

  selectable: true,

  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      file: { default: null },
      sha256: { default: null },
      uploading: { default: false },
      uploadError: { default: null },
      uploadType: { default: 'nip96' },
      uploadUrl: { default: 'https://nostr.build' },
    }
  },

  renderText(props) {
    return props.node.attrs.src
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes, { 'data-type': this.name })]
  },

  parseHTML() {
    return [{ tag: 'video' }]
  },

  addStorage() {
    return {
      markdown: {
        serialize: defaultMarkdownSerializer.nodes.image,
        parse: {},
      },
    }
  },
})
