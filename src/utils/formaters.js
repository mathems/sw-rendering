export function getSlug(name) {
  return name.toLowerCase().replace(/ /g, '-');
}

export function getNameFromKey(key) {
  return key.replace(/_/g, ' ');
}

export function isValidKey(key) {
  return key !== 'films'
    && key !== 'vehicles'
    && key !== 'species'
    && key !== 'starships'
    && key !== 'planets'
    && key !== 'people'
    && key !== 'homeworld'
    && key !== 'created'
    && key !== 'edited'
    && key !== 'url';
}