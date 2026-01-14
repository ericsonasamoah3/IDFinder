export type IDType =
  | "national_id"
  | "drivers_license"
  | "passport"
  | "student_id"
  | "work_id"
  | "other";

export type LostStatus = "searching" | "matched" | "recovered";
export type FoundStatus = "unclaimed" | "matched" | "returned";

export type LostIDRecord = {
  id: string;
  created_date: string;
  owner_name: string;
  owner_email: string;
  id_type: IDType;
  id_number_hint?: string;
  last_seen_location?: string;
  description?: string;
  status: LostStatus;
  matched_found_id?: string;
};

export type FoundIDRecord = {
  id: string;
  created_date: string;
  name_on_id: string;
  id_type: IDType;
  id_number_hint?: string;
  found_location: string;
  photo_url?: string;
  finder_name?: string;
  finder_contact: string;
  description?: string;
  status: FoundStatus;
  matched_lost_id?: string;
};

const LOST_KEY = "id_finder_lost";
const FOUND_KEY = "id_finder_found";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function listLostIDs(): LostIDRecord[] {
  const items = safeParse<LostIDRecord[]>(localStorage.getItem(LOST_KEY), []);
  return [...items].sort(
    (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
  );
}

export function listFoundIDs(): FoundIDRecord[] {
  const items = safeParse<FoundIDRecord[]>(localStorage.getItem(FOUND_KEY), []);
  return [...items].sort(
    (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
  );
}

export function saveLostIDs(items: LostIDRecord[]) {
  localStorage.setItem(LOST_KEY, JSON.stringify(items));
}

export function saveFoundIDs(items: FoundIDRecord[]) {
  localStorage.setItem(FOUND_KEY, JSON.stringify(items));
}

function makeId(prefix: string): string {
  // fallback if crypto.randomUUID isn't available
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(16).slice(2);
  return `${prefix}_${id}`;
}

export type CreateLostInput = Omit<LostIDRecord, "id" | "created_date" | "status"> & {
  status?: LostStatus;
};

export function createLostID(input: CreateLostInput): LostIDRecord {
  const item: LostIDRecord = {
    id: makeId("lost"),
    created_date: new Date().toISOString(),
    status: input.status ?? "searching",
    owner_name: input.owner_name,
    owner_email: input.owner_email,
    id_type: input.id_type,
    id_number_hint: input.id_number_hint || "",
    last_seen_location: input.last_seen_location || "",
    description: input.description || "",
    matched_found_id: input.matched_found_id,
  };

  const all = listLostIDs();
  all.unshift(item);
  saveLostIDs(all);
  return item;
}

export type CreateFoundInput = Omit<FoundIDRecord, "id" | "created_date" | "status"> & {
  status?: FoundStatus;
};

export function createFoundID(input: CreateFoundInput): FoundIDRecord {
  const item: FoundIDRecord = {
    id: makeId("found"),
    created_date: new Date().toISOString(),
    status: input.status ?? "unclaimed",
    name_on_id: input.name_on_id,
    id_type: input.id_type,
    id_number_hint: input.id_number_hint || "",
    found_location: input.found_location,
    photo_url: input.photo_url || "",
    finder_name: input.finder_name || "",
    finder_contact: input.finder_contact,
    description: input.description || "",
    matched_lost_id: input.matched_lost_id,
  };

  const all = listFoundIDs();
  all.unshift(item);
  saveFoundIDs(all);
  return item;
}
