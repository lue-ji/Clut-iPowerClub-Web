export const eventload = () => {
  const modules = import.meta.glob(
    '../assets/events/**/*.{jpg,jpeg,png,webp,gif,svg,avif,bmp,tiff,ico,jfif}',//後四綴照片格式
    { eager: true, import: 'default' }
  )
  const images = {}

  for (const path in modules) {
    const parts = path.split('/')
    const fileName = parts.pop()
    const folder = parts.pop() // always took Previous level

    if (!images[folder]) {
      images[folder] = []
    }

    images[folder].push({
      name: fileName,
      url: modules[path]
    })
  }
  return images
}