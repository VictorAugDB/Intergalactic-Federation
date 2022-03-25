import fs from 'fs'

export function getSwaggerFile(): Buffer | undefined {
  const fileExists = fs.existsSync('swagger-output.json')
  if (fileExists) {
    return fs.readFileSync('swagger-output.json')
  }
}
