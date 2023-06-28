const mapping: Record<string, string> = {
  'art-locations': 'art_location',
  organizations: 'organization',
  'todo-lists': 'todo_list',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
