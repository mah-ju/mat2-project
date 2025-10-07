// all icons taken from https://material.io/resources/icons
export default function getIconByMime (fileType) {
  const defaultChoice = {
    bgColor: '#5a5e69',
    iconColor: 'white',
    icon: 'description'
  }

  if (!fileType) return defaultChoice

  const fileTypeGeneral = fileType.split('/')[0]
  const fileTypeSpecific = fileType.split('/')[1]

  if (fileTypeGeneral === 'text') {
    return {
      bgColor: '#5a5e69',
      iconColor: 'white',
      icon: 'text_snippet'
    }
  }

  if (fileTypeGeneral === 'audio') {
    return {
      bgColor: '#068dbb',
      iconColor: 'white',
      icon: 'graphic_eq'
    }
  }

  if (fileTypeGeneral === 'video') {
    return {
      bgColor: '#19af67',
      iconColor: 'white',
      icon: 'ondemand_video'
    }
  }

  if (fileTypeGeneral === 'application' && fileTypeSpecific === 'pdf') {
    return {
      bgColor: '#e25149',
      iconColor: 'white',
      icon: 'picture_as_pdf'
    }
  }

  if (fileTypeGeneral === 'image') {
    return {
      bgColor: '#f2f2f2',
      iconColor: 'primary',
      icon: 'image'
    }
  }

  return defaultChoice
}
