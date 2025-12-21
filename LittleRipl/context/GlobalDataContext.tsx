import React, { createContext, useState, useContext } from 'react';
import { User, Group, Practice } from '../constants/interfaces';
import { users as initialUsers, currentUserUsername } from '../constants/data/users';    
import { groups as initialGroups, selectedGroup as initialSelectedGroup } from '../constants/data/groups';
import { practices as initialPractices } from '../constants/data/practices';

interface GlobalDataContextType {
  users: User[];
  groups: Group[];
  practices: Practice[];
  setPractices: (practices: Practice[]) => void;
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  selectedGroup: string | null;
  setSelectedGroup: (groupId: string | null) => void;
  updateUsers: (users: User[]) => void;
  updateGroups: (groups: Group[]) => void;
}

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export const GlobalDataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers || []);
  const [groups, setGroups] = useState<Group[]>(initialGroups || []);
  const [practices, setPractices] = useState<Practice[]>(initialPractices || []);
  const [currentUser, setCurrentUser] = useState(
    initialUsers.find(u => u.username === currentUserUsername) || null
  );
  const [selectedGroup, setSelectedGroup] = useState<string | null>(initialSelectedGroup);

  return (
    <GlobalDataContext.Provider value={{
      users,
      groups,
      practices,
      setPractices,
      currentUser,
      setCurrentUser,
      selectedGroup,
      setSelectedGroup,
      updateUsers: setUsers,
      updateGroups: setGroups,
    }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export function useGlobalData() {
  const context = useContext(GlobalDataContext);
  if (!context) throw new Error("useGlobalData must be used within GlobalDataProvider");
  return context;
}

