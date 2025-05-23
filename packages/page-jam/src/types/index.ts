// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

// --- Interfaces ---

// Package specification
export interface PackageSpec {
  hash: string;
  length: number;
  erasure_root: string;
  exports_root: string;
  exports_count: number;
}

// Context information
export interface Context {
  anchor: string;
  state_root: string;
  beefy_root: string;
  lookup_anchor: string;
  lookup_anchor_slot: number;
  prerequisites?: string[];
}

//
export interface Result {
  service_id: number;
  code_hash: string;
  payload_hash: string;
  accumulate_gas: number;
  result: { ok?: string };
}

//
export interface SegmentRootLookup {
  segment_tree_root: string;
  work_package_hash: string;
}

// ! Report structure
export interface Report {
  auth_output: string;
  authorizer_hash: string;
  context: Context;
  core_index: number;
  package_spec: PackageSpec;
  results: Result[];
  segment_root_lookup: SegmentRootLookup[];
}

// Guarantee signature
export interface GuaranteeSignature {
  signature: string;
  validator_index: number;
}

// Guarantee work report object
export interface Guarantee {
  report: Report;
  signatures: GuaranteeSignature[];
  slot: number;
}

// Ticket interface
export interface Ticket {
  attempt: number;
  signature: string;
}

// Assurance interface
export interface Assurance {
  anchor: string;
  bitfield: string;
  signature: string;
  validator_index: number;
}

// Preimage interface
export interface Preimage {
  blob: string;
  requester: number;
}

export interface Vote {
  vote: boolean;
  index: number;
  signature: string;
}

export interface Verdict {
  target: string;
  age: number;
  votes: Vote[];
}

export interface Culprit {
  target: string;
  key: string;
  signature: string;
}

export interface Fault {
  target: string;
  vote: boolean;
  key: string;
  signature: string;
}

export interface Disputes {
  verdicts: Verdict[];
  culprits: Culprit[];
  faults: Fault[];
}

// Extrinsic interface combining all arrays
export interface Extrinsic {
  tickets: Ticket[];
  disputes?: Disputes | null;
  assurances: Assurance[];
  guarantees: Guarantee[];
  preimages: Preimage[];
}

//
// Epoch mark (used for block proofs)
export interface EpochMark {
  entropy: string;
  ticket_entropy?: string;
  validators: string[];
}

// Block header details
export interface Header {
  author_index: number;
  entropy_source: string;
  epoch_mark: EpochMark; // typically null
  extrinsic_hash: string;
  offenders_mark: string[]; // array (contents depend on your data)
  parent: string;
  parent_state_root: string;
  seal: string;
  slot: number;
  tickets_mark: null; // typically null
}

//
export interface AccordionSubSection {
  title: string;
  count: number;
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}

// Overview data
export interface Overview {
  headerHash: string;
  blockHash: string;
  createdAt: number;
  slot: number;
  finalized: boolean;
}

//
export interface KeyedItem {
  bandersnatch: string;
  ed25519: string;
  bls: string;
  metadata: string;
  [key: string]: unknown;
}

export interface BetaItem {
  header_hash: string;
  mmr: {
    peaks: (string | null)[];
  };
  state_root: string;
  reported: {
    exports_root: string;
    hash: string;
  }[];
}

export interface ChiItem {
  chi_m: number;
  chi_a: number;
  chi_v: number;
  chi_g: object;
}

export interface GammaItem {
  gamma_k: KeyedItem[];
  gamma_z: string;
  gamma_s: {
    keys: string[] | null;
  };
  gamma_a: {
    id: string;
    attempt: number;
  }[];
}

export interface PiEntry {
  blocks: number;
  tickets: number;
  pre_images: number;
  pre_images_size: number;
  guarantees: number;
  assurances: number;
}

export interface CoreStatistics {
  gas_used: number;
  imports: number;
  extrinsic_count: number;
  extrinsic_size: number;
  exports: number;
  bundle_size: number;
  da_load: number;
  popularity: number;
}

export interface ServiceStatistics {
  provided_count: number;
  provided_size: number;
  refinement_count: number;
  refinement_gas_used: number;
  imports: number;
  exports: number;
  extrinsic_size: number;
  extrinsic_count: number;
  accumulate_count: number;
  accumulate_gas_used: number;
  on_transfers_count: number;
  on_transfers_gas_used: number;
}

export interface ServiceStatsSet {
  id: string;
  record: ServiceStatistics;
}

export interface PiItem {
  vals_current: PiEntry[];
  vals_last: PiEntry[];
  cores: CoreStatistics[] | undefined;
  services: ServiceStatsSet[] | undefined;
}

export interface PsiItem {
  good: string[];
  bad: string[];
  wonky: string[];
  offenders: string[];
}

export type RhoItem = ({
  report: Report;
  timeout: number;
} | null)[];

export type ThetaItem = ({
  report?: Report;
  dependencies?: string[];
} | null)[];

//

export interface AccountLookupMetaKey {
  hash: string;
  length: number;
}

export interface AccountLookupMeta {
  key: AccountLookupMetaKey;
  value: number[]; // assuming these are numbers, adjust if needed
}

export interface AccountPreimage {
  hash: string;
  blob: string;
}

export interface AccountService {
  code_hash: string;
  balance: number;
  min_item_gas: number;
  min_memo_gas: number;
  bytes: number;
  items: number;
}

export interface AccountData {
  service: AccountService;
  preimages: AccountPreimage[];
  lookup_meta: AccountLookupMeta[];
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  storage: unknown | null; // could be null or some object
}

export interface AccountItem {
  id: number;
  data: AccountData;
}

export interface ServiceInfo {
  metadata: string;
  service_index: number;
  balance: number;
  min_item_gas: number;
  min_memo_gas: number;
  code_size: number;
  items: number;
  code_hash: string;
}

export interface ServiceValue {
  serviceID: number;
  key: string;
  hash: string;
  headerHash: string;
  value: string;
  slot: number;
}

export interface ServiceInfoDetail {
  service: number;
  metadata: string;
  last_refine_slot: number;
  last_accumulate_slot: number;
  statistics: ServiceStatistics;
}

export interface ServicePreimage {
  length: number;
  metadata: string;
  rawbytes: string;
}

export interface ValidatorShowCase {
  index: number;
  hash: string;
  lastSeenTime: number;
}
