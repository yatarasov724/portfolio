/**
 * Utility function for smooth scrolling to element
 */
export function scrollToElement(
  elementId: string,
  offset: number = 80,
  behavior: ScrollBehavior = 'smooth'
) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    window.scrollTo({
      top: offsetPosition,
      behavior,
    })
  }
}

/**
 * Handle smooth scroll on anchor click
 */
export function handleSmoothScroll(
  e: React.MouseEvent<HTMLAnchorElement>,
  elementId: string,
  offset: number = 80
) {
  e.preventDefault()
  scrollToElement(elementId, offset)
}
