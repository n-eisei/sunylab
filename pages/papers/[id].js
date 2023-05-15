import Layout from '../../components/layout'
import { getAllFileIds, getFileData } from '../../lib/papers_ds'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Page({ pageData }) {
  return (
    <Layout>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{pageData.title}</h1>
        <div className={utilStyles.lightText}>
          Updated: <Date dateString={pageData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllFileIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const pageData = await getFileData(params.id)
  return {
    props: {
      pageData
    }
  }
}
