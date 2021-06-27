import Head from 'next/head'

const Meta = ({title, keywords, description}) => {
    return (

        <Head>
            <meta name='viewport' content="width=device-width, initial-scale=1" />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf_8' />
            <link rel='icon' href='/favicon.ico' />
            <title>{title}</title>


        </Head>

    )
}

Meta.defaultProps = {
    title: 'DJ Events | Find the hottest parties',
    keywords: "Music, events, musical, dj, edm, tour, musical events, concert, live music",
    description: 'Find the latest DJ and other musical events'

}

export default Meta
