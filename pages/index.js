import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedFilesData } from '../lib/papers_ds'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({ allFilesData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2 className={utilStyles.headingLg}>中原研について</h2>
        <p>
        センシングデバイスの進歩に伴い様々なモダリティの情報が取得可能となってきている。
        音声、テキスト、また、赤外線画像やハイパースペクトル画像などといった特性の異なる情報を適材適所に活用し、性能向上を目指した研究、すなわちマルチモーダル情報を利用した情報処理研究を携わっている。研究の代表例として、（1）映像と音声とを用いた映像中イベント検出、（2）映像（通常のRGBカメラ）と赤外線画像とを用いた行動認識、（3）可視光画像（RGB画像）とハイパースペクトル画像とを用いた空間超解像の研究。
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>論文（抜粋）：</h2>
        <ul className={utilStyles.list}>
          {allFilesData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/papers/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allFilesData = getSortedFilesData()
  return {
    props: {
      allFilesData
    }
  }
}
