import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'

import { User } from '../../interfaces'
import { sampleUserData } from '../../utils/sample-data'
import Layout from '../../components/Layout'
import ListDetail from '../../components/ListDetail'

type Props = {
  user?: User
  errors?: string
}

export default class StaticPropsDetail extends React.Component<Props> {
  render() {
    const { user, errors } = this.props;

    if (errors) {
      return (
        <Layout title={`Error | Next.js + TypeScript Example`}>
          <p>
            <span style={{ color: 'red' }}>Error:</span> {errors}
          </p>
        </Layout>
      )
    }

    return (
      <Layout
        title={`${
          user ? user.name : 'User Detail'
        } | Next.js + TypeScript Example`}
      >
        {user && <ListDetail user={user} />}
      </Layout>
    )
  }
}


/**
 *  Dynamic Routes利用時にも静的なファイルを生成するためのAPIです。
 *  pathsはビルド対象のパス、 fallbackは事前ビルドしたパス以外にアクセスしたときの動作
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = sampleUserData.map(user => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false }
};


/**
 * ビルド時に静的なファイルを事前に生成するためのAPI(ページに必要なデータをpropsとして渡します)
 * サーバーサイドで実行される
 * @param params
 */
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const item = sampleUserData.find(data => data.id === Number(id));
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { user: item } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
};
