import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getCompletedEvents,
  getFeaturedEvents,
  isActive,
  isExpired,
  isUpcoming,
} from '../src/utils/events.js'

test('活動狀態會正確判斷過去與未來日期', () => {
  const past = { startDate: '2000-01-01T00:00:00', endDate: '2000-01-02T00:00:00' }
  const future = { startDate: '2099-01-01T00:00:00', endDate: '2099-01-02T00:00:00' }

  assert.equal(isExpired(past), true)
  assert.equal(isActive(past), false)
  assert.equal(isUpcoming(future), true)
  assert.equal(isActive(future), false)
})

test('精選活動與已結束活動遵循 order 排序', () => {
  const events = [
    { id: 'third', featured: true, order: 3, endDate: '2000-01-02T00:00:00' },
    { id: 'first', featured: true, order: 1, endDate: '2000-01-02T00:00:00' },
    { id: 'second', featured: false, order: 2, endDate: '2000-01-02T00:00:00' },
  ]

  assert.deepEqual(getFeaturedEvents(events).map((event) => event.id), ['first', 'third'])
  assert.deepEqual(getCompletedEvents(events).map((event) => event.id), ['third', 'second', 'first'])
})
