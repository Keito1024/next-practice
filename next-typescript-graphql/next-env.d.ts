/// <reference types="next" />
/// <reference types="next/types/global" />
// typescriptでquery.gqlがimportできない問題解消
declare module '*.graphqls' {
  import { DocumentNode } from 'graphql'
  export default typeof DocumentNode
}
