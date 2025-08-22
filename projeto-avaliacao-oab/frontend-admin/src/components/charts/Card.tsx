interface UserProps {
  user: {
    id: number;
    name: string;
    email: string;
    submittedAt: string;
  };
}

export const UserCard = ({ user }: UserProps) => {
  return (
    <div className="bg-blue-700 p-4 rounded-lg shadow-md hover:scale-105 transition-transform">
      <h3 className="text-lg font-bold">{user.name}</h3>
      <p className="text-sm">{user.email}</p>
      <p className="text-xs mt-1">Enviado em: {user.submittedAt}</p>
    </div>
  );
};
