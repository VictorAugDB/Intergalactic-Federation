import 'reflect-metadata'
import 'module-alias/register'
import '@/infra/database'
import { getApp } from '@/main/config/app'

getApp().listen(3333, () => console.log('Server is running on port 3333'))
