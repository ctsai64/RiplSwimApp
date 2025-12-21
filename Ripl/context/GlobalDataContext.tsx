import React, { createContext, useState, useContext, useCallback } from 'react';
import { User, Group, Practice, Split, TimedSession } from '../constants/interfaces';
import { users as initialUsers, currentUserUsername } from '../constants/data/users';    
import { groups as initialGroups, selectedGroup as initialSelectedGroup } from '../constants/data/groups';
import { practices as initialPractices } from '../constants/data/practices';

interface GlobalDataContextType {
  users: User[];
  groups: Group[];
  practices: Practice[];
  timedSessions: TimedSession[];
  setPractices: (practices: Practice[]) => void;
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  selectedGroup: string | null;
  setSelectedGroup: (groupId: string | null) => void;
  selectedPracticeId: string | null;
  selectPractice: (practiceId: string) => void;
  updateUsers: (users: User[]) => void;
  updateGroups: (groups: Group[]) => void;
  addSplitToUser: (username: string, split: Split) => void;
  addSplitToPractice: (practiceId: string, split: Split) => void;
  createTimedSession: (session: TimedSession) => void;
  updateTimedSession: (sessionId: string, updates: Partial<TimedSession>) => void;
}

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export const GlobalDataProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers || []);
  const [groups, setGroups] = useState<Group[]>(initialGroups || []);
  const [practices, setPractices] = useState<Practice[]>(initialPractices || []);
  const [timedSessions, setTimedSessions] = useState<TimedSession[]>([]);
  const [currentUser, setCurrentUser] = useState(
    initialUsers.find(u => u.username === currentUserUsername) || null
  );
  const [selectedGroup, setSelectedGroup] = useState<string | null>(initialSelectedGroup);
  const [selectedPracticeId, setSelectedPracticeId] = useState<string | null>(null);

  const addSplitToUser = useCallback((username: string, split: Split) => {
    setUsers(prev => prev.map(user => 
      user.username === username 
        ? { ...user, splits: [...user.splits, split] }
        : user
    ));
  }, []);

  const addSplitToPractice = useCallback((practiceId: string, split: Split) => {
    setPractices(prev => prev.map(practice =>
      practice.id === practiceId
        ? { ...practice, splits: [...practice.splits, split] }
        : practice
    ));
  }, []);

  const createTimedSession = useCallback((session: TimedSession) => {
    setTimedSessions(prev => [...prev, session]);
  }, []);

  const updateTimedSession = useCallback((sessionId: string, updates: Partial<TimedSession>) => {
    setTimedSessions(prev => prev.map(session =>
      session.id === sessionId
        ? { ...session, ...updates }
        : session
    ));
  }, []);

  const selectPractice = useCallback((practiceId: string) => {
    setSelectedPracticeId(practiceId);
  }, []);

  return (
    <GlobalDataContext.Provider value={{
      users,
      groups,
      practices,
      timedSessions,
      setPractices,
      currentUser,
      setCurrentUser,
      selectedGroup,
      setSelectedGroup,
      selectedPracticeId,
      selectPractice,
      updateUsers: setUsers,
      updateGroups: setGroups,
      addSplitToUser,
      addSplitToPractice,
      createTimedSession,
      updateTimedSession,
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

