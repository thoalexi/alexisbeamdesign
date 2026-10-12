import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  businessName?: string
  service?: string
  budget?: string
  message?: string
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Section style={{ margin: '0 0 14px' }}>
    <Text style={labelStyle}>{label}</Text>
    <Text style={valueStyle}>{value || '—'}</Text>
  </Section>
)

const Email = ({ name, email, businessName, service, budget, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New inquiry from {name || 'a visitor'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>alexis beam<span style={{ color: '#C88E76' }}>.</span></Text>
        <Heading style={h1}>New inquiry</Heading>
        <Hr style={hr} />
        <Row label="Name" value={name} />
        <Row label="Email" value={email} />
        <Row label="Business" value={businessName} />
        <Row label="Service" value={service} />
        <Row label="Budget" value={budget} />
        <Text style={labelStyle}>Message</Text>
        <Text style={{ ...valueStyle, whiteSpace: 'pre-wrap' }}>{message || '—'}</Text>
        <Hr style={hr} />
        <Text style={foot}>Reply to this email to respond directly to {name || 'them'}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `New inquiry from ${d.name || 'your website'}`,
  displayName: 'New inquiry alert',
  to: 'alexisbeamdesign@gmail.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    businessName: 'Example Co.',
    service: 'Website Redesign',
    budget: 'Prefer not to say',
    message: 'Hi Alexis, I would love to talk about refreshing our website.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif', color: '#252525' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const brand = { fontFamily: 'Georgia, serif', fontSize: '20px', margin: '0 0 24px' }
const h1 = { fontFamily: 'Georgia, serif', fontSize: '28px', fontWeight: 400, margin: '0 0 16px' }
const hr = { borderColor: '#EFECE5', margin: '20px 0' }
const labelStyle = { fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: '#547780', margin: '0 0 4px' }
const valueStyle = { fontSize: '15px', lineHeight: '1.5', margin: 0 }
const foot = { fontSize: '13px', color: '#6b6b6b', margin: 0 }
