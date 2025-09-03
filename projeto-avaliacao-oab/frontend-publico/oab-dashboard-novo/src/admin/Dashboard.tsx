// src/admin/Dashboard.tsx

// Os caminhos agora devem estar corretos, pois os arquivos existem em 'src/components/'
import Content from '../components/Content';
import Layout from '../components/Layout';

export default function AdminDashboard() {
  return (
    <Layout>
      <Content />
    </Layout>
  );
}