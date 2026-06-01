export const fileload = () => {
    const modules = import.meta.glob(
      '../assets/files/**/*.{pdf,doc,docx,xls,xlsx,ppt,pptx,zip,txt}',
      { eager: true, import: 'default' }
    )
  
    const files = {}
  
    for (const path in modules) {
      const parts = path.split('/')
      const fileName = parts.pop()
      const folder = parts.pop() // always took Previous level
  
      if (!files[folder]) {
        files[folder] = []
      }
  
      files[folder].push({
        name: fileName,
        url: modules[path],
        ext: fileName.split('.').pop().toLowerCase()
      })
    }
  
    return files
  }