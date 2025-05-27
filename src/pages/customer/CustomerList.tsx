import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonGrid, 
  IonCol, 
  IonRow, 
  IonButton, 
  IonCard, 
  IonIcon, 
  IonItem 
} from '@ionic/react';
import { useParams } from 'react-router';
import { add, pencil, close } from 'ionicons/icons';
import { useState } from 'react';

// Definición de tipo para Customer
interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
}

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string; }>();
  
  // Estado para los clientes con datos de ejemplo
  const [clients, setClients] = useState<Customer[]>([
    {
      id: '1',
      firstname: 'Juan',
      lastname: 'Pérez',
      email: 'juan@example.com',
      phone: '555-1234',
      address: 'Calle Principal 123'
    },
    {
      id: '2',
      firstname: 'María',
      lastname: 'Gómez',
      email: 'maria@example.com',
      phone: '555-5678',
      address: 'Avenida Central 456'
    }
  ]);

  // Función para agregar cliente
  const addCustomer = () => {
    const newCustomer: Customer = {
      id: (clients.length + 1).toString(),
      firstname: 'Nuevo',
      lastname: 'Cliente',
      email: 'nuevo@example.com',
      phone: '555-0000',
      address: 'Dirección nueva'
    };
    setClients([...clients, newCustomer]);
  };

  // Función para editar cliente
  const editCustomer = (id: string) => {
    console.log('Editar cliente con id:', id);
    // Aquí iría la lógica para editar
  };

  // Función para eliminar cliente
  const removeCustomer = (id: string) => {
    setClients(clients.filter(client => client.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name || 'Clientes'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>Gestión de Clientes</IonTitle>

          <IonItem>
            <IonButton onClick={addCustomer} color="primary" fill="solid" slot="end">
              <IonIcon icon={add} />
              Agregar Cliente
            </IonButton>
          </IonItem>

          <IonGrid className="table">
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Teléfono</IonCol>
              <IonCol>Dirección</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>

            {clients.map((client) => (
              <IonRow key={client.id}>
                <IonCol>{client.firstname} {client.lastname}</IonCol>
                <IonCol>{client.email}</IonCol>
                <IonCol>{client.phone}</IonCol>
                <IonCol>{client.address}</IonCol>
                <IonCol>
                  <IonButton color="primary" fill="clear"
                    onClick={() => editCustomer(client.id)}>
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>

                  <IonButton color="danger" fill="clear"
                    onClick={() => removeCustomer(client.id)}>
                    <IonIcon icon={close} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;