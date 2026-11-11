import React, { useState } from 'react';
import { AdminContext } from './adminContextDef';

export function AdminProvider({ children, initialOrdersCount = 7, initialCustomersCount = 3 }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'customers'
  const [selectedDivision, setSelectedDivision] = useState(''); // '' | 'apparel' | 'merchandise' | 'percetakan'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);

  const [counts, setCounts] = useState({
    totalOrders: initialOrdersCount,
    inProgress: 6,
    completed: 1,
    customers: initialCustomersCount,
  });

  const selectTab = (tab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  const selectDivision = (div) => {
    setActiveTab('orders');
    setSelectedDivision(div);
    setMobileSidebarOpen(false);
  };

  const openNewOrder = () => {
    setActiveTab('orders');
    setShowNewOrderModal(true);
    setMobileSidebarOpen(false);
  };

  const openNewCustomer = () => {
    setActiveTab('customers');
    setShowNewCustomerModal(true);
    setMobileSidebarOpen(false);
  };

  return (
    <AdminContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectTab,
        selectedDivision,
        setSelectedDivision,
        selectDivision,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        showNewOrderModal,
        setShowNewOrderModal,
        openNewOrder,
        showNewCustomerModal,
        setShowNewCustomerModal,
        openNewCustomer,
        counts,
        setCounts,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
