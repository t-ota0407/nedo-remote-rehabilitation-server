import { RehabilitationCondition } from "./rehabilitationCondition"

export type ResultContent = {
  rehabilitationCondition: RehabilitationCondition,
  rehabilitationStartedAt: Date,
  rehabilitationFinishedAt: Date,
  reachingTimes: number,
  sharpenedKnifeBefore: number,
  sharpenedKnifeAfter: number,
}