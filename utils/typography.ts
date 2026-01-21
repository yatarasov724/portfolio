/**
 * Утилита для исправления типографики: предотвращение висячих предлогов и союзов
 * Добавляет неразрывные пробелы перед короткими предлогами и союзами
 */
export const fixTypography = (text: string | number | null | undefined): string => {
  try {
    if (text === null || text === undefined) return '';
    if (typeof text === 'number') return String(text);
    if (typeof text !== 'string') return '';
    
    // Список предлогов и союзов (1-3 буквы), после которых нужен неразрывный пробел
    // Неразрывный пробел: \u00A0 (non-breaking space)
    const prepositions = [
      'и', 'а', 'в', 'с', 'у', 'о', 'к', 'на', 'по', 'от', 'до', 'из', 'за', 
      'об', 'под', 'над', 'для', 'при', 'пре', 'про', 'через', 'без', 'между',
      'перед', 'после', 'около', 'возле', 'вдоль', 'вместо', 'кроме', 'среди',
      'против', 'ради', 'согласно', 'благодаря', 'вопреки', 'навстречу'
    ];
    
    // Создаем регулярное выражение для поиска предлогов и союзов
    // Ищем слова, которые стоят перед пробелом и следующим словом
    const pattern = new RegExp(
      `(^|\\s)(${prepositions.join('|')})\\s+`,
      'gi'
    );
    
    // Заменяем обычный пробел после предлога на неразрывный
    return text.replace(pattern, (match, space, prep) => {
      return space + prep + '\u00A0';
    });
  } catch (error) {
    // В случае ошибки возвращаем исходный текст как строку
    console.error('Error in fixTypography:', error);
    return typeof text === 'string' ? text : String(text || '');
  }
};
