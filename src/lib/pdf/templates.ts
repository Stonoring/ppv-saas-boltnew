import fs from 'fs';
import path from 'path';

const templateCache: Record<string, string> = {};

function loadTemplate(type: 'accord' | 'lettre'): string {
  if (templateCache[type]) {
    return templateCache[type];
  }

  const templatePath = path.join(process.cwd(), 'src', 'lib', 'templates', `${type}-template.txt`);
  const template = fs.readFileSync(templatePath, 'utf-8');
  templateCache[type] = template;
  return template;
}

export function getTemplate(type: 'accord' | 'lettre'): string {
  try {
    return loadTemplate(type);
  } catch (error) {
    console.error(`Error loading template for ${type}:`, error);
    return '';
  }
}

export function replacePlaceholders(template: string, data: Record<string, any>): string {
  return template.replace(/{{(\w+)}}/g, (match, key) => {
    return data[key]?.toString() || match;
  });
}