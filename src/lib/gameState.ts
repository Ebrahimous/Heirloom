import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  increment,
  updateDoc,
  serverTimestamp,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';
import type { GameState, DecisionRecord, CharacterNames } from '../constants/ledgerTypes';
import type { FamilyLedger } from '../constants/ledgerTypes';

function generateId(): string {
  return crypto.randomUUID();
}

export async function createGame(
  userId: string,
  familyName: string,
  archetype: string,
  startingLedger: FamilyLedger,
  characterNames: CharacterNames
): Promise<GameState> {
  const gameId = generateId();
  const gameState: GameState = {
    gameId,
    userId,
    familyName,
    archetype,
    characterNames,
    currentGeneration: 1,
    currentDecisionIndex: 0,
    ledger: startingLedger,
    narrativeFlags: [],
    decisionHistory: [],
    status: 'active',
    createdAt: Date.now(),
  };

  await setDoc(doc(db, 'games', gameId), {
    ...gameState,
    createdAt: serverTimestamp(),
  });

  // Create user record if needed
  await setDoc(doc(db, 'users', userId), { lastActive: serverTimestamp() }, { merge: true });

  return gameState;
}

export async function saveGame(gameState: GameState): Promise<void> {
  await setDoc(doc(db, 'games', gameState.gameId), {
    ...gameState,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function loadGame(gameId: string): Promise<GameState | null> {
  const snap = await getDoc(doc(db, 'games', gameId));
  if (!snap.exists()) return null;
  return snap.data() as GameState;
}

export async function loadActiveGame(userId: string): Promise<GameState | null> {
  const q = query(
    collection(db, 'games'),
    where('userId', '==', userId),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc'),
    limit(1)
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return snap.docs[0].data() as GameState;
}

export async function recordDecision(
  gameState: GameState,
  record: DecisionRecord
): Promise<GameState> {
  const updated: GameState = {
    ...gameState,
    decisionHistory: [...gameState.decisionHistory, record],
    currentDecisionIndex: gameState.currentDecisionIndex + 1,
  };

  await saveGame(updated);

  // Increment community path stats
  try {
    const pathRef = doc(db, 'communityPaths', record.decisionId);
    await updateDoc(pathRef, {
      [record.optionId]: increment(1),
    }).catch(async () => {
      // Document doesn't exist yet — create it
      await setDoc(pathRef, { [record.optionId]: 1 });
    });
  } catch {
    // Non-critical — don't fail the game for this
  }

  return updated;
}

export async function advanceGeneration(gameState: GameState): Promise<GameState> {
  const updated: GameState = {
    ...gameState,
    currentGeneration: gameState.currentGeneration + 1,
    currentDecisionIndex: 0,
  };
  await saveGame(updated);
  return updated;
}

export async function completeGame(gameState: GameState): Promise<GameState> {
  const updated: GameState = {
    ...gameState,
    status: 'complete',
    completedAt: Date.now(),
  };
  await setDoc(doc(db, 'games', gameState.gameId), {
    ...updated,
    completedAt: serverTimestamp(),
  }, { merge: true });
  return updated;
}

export async function getCommunityPaths(decisionId: string): Promise<Record<string, number>> {
  const snap = await getDoc(doc(db, 'communityPaths', decisionId));
  if (!snap.exists()) return {};
  return snap.data() as Record<string, number>;
}
