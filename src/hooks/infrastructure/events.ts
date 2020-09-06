import { ChannelName } from '../domain'
import { HookEnvironment } from './HookEnvironment'

export type HookEvent<A = any> =
  | CreatedHookEnvironment
  | UpdatedHookEnvironment
  | RunningHookEnvironment
  | RemovedHookEnvironment
  | ChannelUpdated<A>

export enum HookEventType {
  CreatedEnvironment = 'hookEnvironment/created',
  UpdatedEnvironment = 'hookEnvironment/updated',
  RunningEnvironment = 'hookEnvironment/running',
  RemovedEnvironment = 'hookEnvironment/removed',
  UpdatedChannel = 'channel/updated',
}

export interface CreatedHookEnvironment {
  readonly type: HookEventType.CreatedEnvironment
  readonly hookEnvironment: HookEnvironment
}

export interface UpdatedHookEnvironment {
  readonly type: HookEventType.UpdatedEnvironment
  readonly hookEnvironment: HookEnvironment
}

export interface RunningHookEnvironment {
  readonly type: HookEventType.RunningEnvironment
  readonly hookEnvironment: HookEnvironment
}

export interface RemovedHookEnvironment {
  readonly type: HookEventType.RemovedEnvironment
  readonly hookEnvironment: HookEnvironment
}

export interface ChannelUpdated<A> {
  readonly type: HookEventType.UpdatedChannel
  readonly channel: ChannelName
  readonly hookEnvironment: HookEnvironment
  readonly currentValue: A
  readonly updatedValue: A
}

export const isRemovedHookEnvironmentEvent = (e: HookEvent): e is RemovedHookEnvironment =>
  e.type === HookEventType.RemovedEnvironment

export const isUpdatedHookEnvironmentEvent = (e: HookEvent): e is UpdatedHookEnvironment =>
  e.type === HookEventType.UpdatedEnvironment

export const isCreatedHookEnvironmentEvent = (e: HookEvent): e is CreatedHookEnvironment =>
  e.type === HookEventType.CreatedEnvironment

export const isUpdatedChannelEvent = (e: HookEvent): e is ChannelUpdated<unknown> =>
  e.type === HookEventType.UpdatedChannel
