import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Customer from './Customer';
import { removeCustomer, searchCustomers } from './CustomerApi';

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clientes, setClientes] = useState<Customer[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    let result = await searchCustomers();
    setClientes(result);
  }

  const remove = async (id: string) => {
    await removeCustomer(id);
    search();
  }

  const addCustomer = () => {
    history.push('/page/customer/new');
  }

  const editCustomer = (id: string) => {
    history.push('/page/customer/' + id);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle className="ion-padding">Gestión de Clientes</IonTitle>

          <IonItem lines="none">
            <IonButton 
              onClick={addCustomer} 
              color="primary" 
              fill="solid" 
              slot="end"
            >
              <IonIcon icon={add} slot="start" />
              Agregar Cliente
            </IonButton>
          </IonItem>

          <IonGrid className="ion-margin">
            <IonRow className="table-header">
              <IonCol><strong>Nombre</strong></IonCol>
              <IonCol><strong>Email</strong></IonCol>
              <IonCol><strong>Teléfono</strong></IonCol>
              <IonCol><strong>Dirección</strong></IonCol>
              <IonCol><strong>Acciones</strong></IonCol>
            </IonRow>

            {clientes.map((cliente: Customer) => (
              <IonRow key={cliente.id} className="table-row">
                <IonCol>{cliente.firstname} {cliente.lastname}</IonCol>
                <IonCol>{cliente.email}</IonCol>
                <IonCol>{cliente.phone}</IonCol>
                <IonCol>{cliente.address}</IonCol>
                <IonCol>
                  <IonButton 
                    color="primary" 
                    fill="clear"
                    onClick={() => editCustomer(String(cliente.id))}
                  >
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>

                  <IonButton 
                    color="danger" 
                    fill="clear"
                    onClick={() => remove(String(cliente.id))}
                  >
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