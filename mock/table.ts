import faker from 'faker'
import { Response, Request, Router }  from 'express'
import { accessTokenAuth } from './security'

interface ArticleList {
    id: number;
    title: string;
    status: string;
    author: string;
    display_time: number;
    pageviews: number;
}

const router = Router()

const articleCount = 200
const data: Array<ArticleList> = []

for (let i = 0; i < articleCount; i++) {
    data.push({
        id: i,
        title: faker.lorem.sentence(6, 10),
        status: faker.random.arrayElement(['published', 'draft', 'deleted']),
        author: faker.name.findName(),
        display_time: faker.date.past().getTime(),
        pageviews: faker.random.number({ min: 300, max: 500 })
    })
  }


export const tableList = (req: Request, res: Response) => {
    const items = data
    return res.json({
        code: 20000,
        data: {
            total: items.length,
            items: items
        }
    })
}

router.get('/list',accessTokenAuth, tableList)
export default router

