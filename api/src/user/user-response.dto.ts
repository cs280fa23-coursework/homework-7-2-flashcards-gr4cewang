export class UserResponseDTO {
  id: number;
  username: string;
  displayName: string;
  avatar?: string;
  // Returns the idi & username, but not the password
}
