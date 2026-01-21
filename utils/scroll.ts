/**
 * Плавный скролл к элементу на текущей странице
 */
export function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) {
  e.preventDefault()
  if (typeof window !== 'undefined') {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}

/**
 * Утилита для перехода на главную страницу с последующим скроллом к секции
 */
export function scrollToSectionOnHome(sectionId: string) {
  // Если мы уже на главной странице, просто скроллим
  if (typeof window !== 'undefined' && window.location.pathname === '/') {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  } else {
    // Если мы на другой странице, переходим на главную с хешем
    window.location.href = `/#${sectionId}`
  }
}

/**
 * Обработчик для скролла к секции после загрузки страницы (если есть хеш в URL)
 */
export function handleHashScroll() {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash
    if (hash) {
      const sectionId = hash.substring(1) // Убираем #
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) {
          const headerOffset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100) // Небольшая задержка для рендеринга
    }
  }
}
