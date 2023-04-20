import fs from 'fs'
import type { PageServerLoad } from './$types'

type SomeType = {
    post: string,
    dirContent: string[]
}

export const load: PageServerLoad<SomeType> = () => {
    const dirContent = fs.readdirSync('.')
    
    return {
        post: 'hey',
        dirContent
    }

}