import type { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core'

const icons: { [key: string]: [IconPrefix, IconName] } = {
  image: ['far', 'file-image'],
  pdf: ['far', 'file-pdf'],
  word: ['far', 'file-word'],
  powerpoint: ['far', 'file-powerpoint'],
  excel: ['far', 'file-excel'],
  audio: ['far', 'file-audio'],
  video: ['far', 'file-video'],
  archive: ['far', 'file-archive'],
  code: ['far', 'file-code'],
  text: ['far', 'file-alt'],
  file: ['far', 'file'],
  markdown: ['fab', 'markdown'],
  book: ['fas', 'book'],
  link: ['fas', 'link'],
}

const extensions = {
  gif: icons.image,
  jpeg: icons.image,
  jpg: icons.image,
  png: icons.image,
  heic: icons.image,
  webp: icons.image,

  pdf: icons.pdf,

  doc: icons.word,
  docx: icons.word,

  ppt: icons.powerpoint,
  pptx: icons.powerpoint,

  xls: icons.excel,
  xlsx: icons.excel,

  aac: icons.audio,
  mp3: icons.audio,
  ogg: icons.audio,
  flac: icons.audio,
  oga: icons.audio,
  opus: icons.audio,
  m4a: icons.audio,
  wav: icons.audio,

  avi: icons.video,
  flv: icons.video,
  mkv: icons.video,
  mp4: icons.video,
  mov: icons.video,
  m3u8: icons.video,
  webm: icons.video,

  '7z': icons.archive,
  bz2: icons.archive,
  xz: icons.archive,
  wim: icons.archive,
  gz: icons.archive,
  rar: icons.archive,
  tar: icons.archive,
  zip: icons.archive,

  c: icons.code,
  cpp: icons.code,
  js: icons.code,
  jsx: icons.code,
  java: icons.code,
  sh: icons.code,
  cs: icons.code,
  py: icons.code,
  css: icons.code,
  html: icons.code,
  ts: icons.code,   // typescript or video file, determined below
  tsx: icons.code,
  rs: icons.code,
  vue: icons.code,
  json: icons.code,
  yml: icons.code,
  yaml: icons.code,
  toml: icons.code,

  txt: icons.text,
  rtf: icons.text,
  vtt: icons.text,
  srt: icons.text,
  log: icons.text,
  diff: icons.text,

  md: icons.markdown,
  markdown: icons.markdown,
  mdown: icons.markdown,

  epub: icons.book,
  mobi: icons.book,
  azw3: icons.book,

  url: icons.link,
}

/**
 * To stop TypeScript complaining about indexing the object with a non-existent key
 * https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
 *
 * Fixed by ChatGPT with the upgrade of TypeScript 4.9
 *
 * @param obj Object with keys to index
 * @param key The index key
 * @returns Whether or not the key exists inside the object
 */
export function hasKey(obj: Record<string, any>, key: string): boolean {
  return key in obj
}

export function getRawExtension(fileName: string): string {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
}
export function getExtension(fileName: string): string {
  return getRawExtension(fileName).toLowerCase()
}

export function getFileIcon(fileName: string, flags?: { video?: boolean }): [IconPrefix, IconName] {
  const extension = getExtension(fileName)
  let icon = hasKey(extensions, extension) ? extensions[extension] : icons.file

  // Files with '.ts' extensions may be TypeScript files or TS Video files, we check for the flag 'video'
  // to determine which icon to render for '.ts' files.
  if (extension === 'ts') {
    if (flags?.video) {
      icon = icons.video
    }
  }

  return icon
}
