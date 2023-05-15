import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const dsDirectory = path.join(process.cwd(), 'papers_ds')

export function getSortedFilesData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(dsDirectory)
  const allFilesData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(dsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const stats = fs.statSync(fullPath)
    const date  = stats.mtime.toISOString()
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      date,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allFilesData.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllFileIds() {
  const fileNames = fs.readdirSync(dsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getFileData(id) {
  const fullPath = path.join(dsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const stats = fs.statSync(fullPath)
  const date  = stats.mtime.toISOString()

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    date,
    contentHtml,
    ...matterResult.data
  }
}
