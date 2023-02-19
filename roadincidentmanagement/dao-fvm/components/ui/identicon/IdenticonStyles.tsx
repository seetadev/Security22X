import styled, { css } from 'styled-components'
import { IdenticonBadgeColors } from './types'

const colors = {
  background: css`
    background: var(--collective-color-background);
    color: var(--collective-color-textSecondary);
  `,
  accent: css`
    background: var(--collective-color-accentDarken);
    color: var(--collective-color-accentContrast);
  `,
}

export const IdenticonBadgeStyle = styled.div<{ $color: IdenticonBadgeColors }>`
  border-radius: 1000px;
  padding: 4px;
  margin: 0 6px;
  display: inline-flex;
  align-items: center;

  ${({ $color }) => colors[$color]}
`

export const IdenticonStyle = styled.div`
  border-radius: 1000px;
  overflow: hidden;
  line-height: 0;
  display: inline-block;
`

export const AddressWrapperStyle = styled.div`
  padding: 0 6px;
`
