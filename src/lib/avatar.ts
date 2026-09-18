export function getDefaultAvatar(role?: string | null): string {
  switch (role) {
    case 'business_owner':
      return '/assets/smeshield/avatars/default-business-owner.jpg'
    case 'sole_entrepreneur':
      return '/assets/smeshield/avatars/default-sole-entrepreneur.jpg'
    case 'employee':
    default:
      return '/assets/smeshield/avatars/default-employee.jpg'
  }
}
