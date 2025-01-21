'use client'

import React from 'react'
import { Page, Text, View, Document, Image } from '@react-pdf/renderer'
import { styles } from '@/constants/react-pdf'
import { ListData } from '@/services/get-products'

interface DataProps {
    total: number
    name: string
    data: ListData | undefined
}

interface ReportPdfProps {
    data: DataProps[] | undefined
    total: string
}

const ReportPdf: React.FC<ReportPdfProps> = ({ data, total }) => {
    const logo = './logo.png'
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image style={styles.logo} src={logo} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Relatório Confidencial</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>CONFERÊNCIA DE CONTA</Text>
                </View>

                <View style={styles.div}>
                    <Text style={styles.title}>Produto</Text>
                    {data?.map((item, index) => (
                        <View style={styles.flex} key={index}>
                            <Text style={styles.text}>{item?.name}</Text>
                            <Text style={styles.text}>{item?.total}</Text>
                        </View>
                    ))}

                    <View style={styles.total}>
                        <Text>
                            Total: <sup>R$</sup>
                            {total}
                        </Text>
                    </View>
                </View>
                <View style={styles.fiscal}>
                    <Text style={styles.text}>
                        ** Não é Documento Fiscal **
                    </Text>
                </View>
            </Page>
        </Document>
    )
}

export default ReportPdf
