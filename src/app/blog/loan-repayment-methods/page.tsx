import Link from "next/link";

export default function LoanRepaymentPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog/"
        className="text-sm text-blue-500 hover:underline mb-4 inline-block"
      >
        ← 블로그로 돌아가기
      </Link>
      <h1 className="text-3xl font-bold mb-4">
        원리금균등 vs 원금균등 - 대출 상환 방식 완벽 비교
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <time>2024.12.24</time>
        <span>·</span>
        <span>읽기 8분</span>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">

        <p className="mb-4 leading-relaxed">
          대출을 받을 때 상환 방식을 선택해야 합니다. 원리금균등상환과 원금균등상환은 같은 금액을 빌려도
          이자 총액이 수백만 원 이상 차이날 수 있습니다. 어떤 방식이 내 상황에 유리한지 정확히 알고 선택하는 것이 중요합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">대출 상환 방식의 종류</h2>
        <p className="mb-4 leading-relaxed">
          국내에서 주로 사용하는 대출 상환 방식은 세 가지입니다:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>원리금균등상환:</strong> 매달 같은 금액을 납부 (원금 + 이자 합산액이 고정)</li>
          <li><strong>원금균등상환:</strong> 매달 같은 원금을 납부 (이자는 매달 줄어듦)</li>
          <li><strong>만기일시상환:</strong> 대출 기간 동안 이자만 납부하다 만기에 원금 일시 상환</li>
        </ul>
        <p className="mb-4 leading-relaxed">
          이 글에서는 가장 많이 사용하는 원리금균등상환과 원금균등상환을 집중적으로 비교합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">원리금균등상환이란?</h2>
        <p className="mb-4 leading-relaxed">
          원리금균등상환은 영어로 Constant Payment Mortgage(CPM)라고도 합니다.
          매달 납부하는 금액(원금+이자)이 일정합니다. 초기에는 이자 비중이 높고 원금 비중이 낮지만,
          시간이 지날수록 이자 비중은 줄고 원금 비중은 늘어납니다. 하지만 납부 금액 자체는 변하지 않습니다.
        </p>
        <p className="mb-4 leading-relaxed">
          월 납부액 계산 공식:
        </p>
        <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-4 mb-4 font-mono text-sm">
          <p>월 납부액 = P × [r(1+r)^n] / [(1+r)^n - 1]</p>
          <p className="mt-2 text-slate-500 dark:text-slate-400 font-sans text-xs">
            P = 대출 원금, r = 월 이자율 (연이율/12), n = 상환 개월 수
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-3">원리금균등상환 예시</h3>
        <p className="mb-3 leading-relaxed text-sm">대출 금액: 3억 원 / 연이율: 4% / 상환기간: 30년(360개월)</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
          <li>월 납부액: 약 143만 2,720원 (고정)</li>
          <li>총 납부액: 약 5억 1,578만 원</li>
          <li>총 이자액: 약 1억 1,578만 원</li>
          <li>1회차 이자: 약 100만 원 / 원금: 약 43만 원</li>
          <li>180회차 이자: 약 70만 원 / 원금: 약 73만 원</li>
          <li>360회차 이자: 약 5,000원 / 원금: 약 143만 원</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">원금균등상환이란?</h2>
        <p className="mb-4 leading-relaxed">
          원금균등상환은 매달 납부하는 원금이 일정합니다. 이자는 남아있는 대출 잔액에 대해 계산되므로
          매달 줄어들어 전체 납부액도 점점 줄어듭니다. 초기에 납부액이 가장 높고 마지막에 가장 낮아집니다.
        </p>
        <p className="mb-4 leading-relaxed">
          월 원금 = 대출 원금 / 상환 개월 수 (고정)
        </p>
        <p className="mb-4 leading-relaxed">
          월 이자 = 남은 원금 × 월 이자율 (매월 감소)
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">원금균등상환 예시</h3>
        <p className="mb-3 leading-relaxed text-sm">대출 금액: 3억 원 / 연이율: 4% / 상환기간: 30년(360개월)</p>
        <ul className="list-disc pl-6 mb-4 space-y-1 text-sm">
          <li>월 원금: 83만 3,333원 (고정)</li>
          <li>1회차 납부액: 83만 + 100만 = 약 183만 3,333원</li>
          <li>180회차 납부액: 83만 + 50만 = 약 133만 3,333원</li>
          <li>360회차 납부액: 83만 + 2,800원 = 약 83만 6,133원</li>
          <li>총 납부액: 약 5억 820만 원</li>
          <li>총 이자액: 약 1억 820만 원</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">두 방식 직접 비교</h2>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">항목</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">원리금균등</th>
                <th className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-left">원금균등</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">월 납부액</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">143만 원 (고정)</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">83만~183만 원 (감소)</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">초기 부담</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">낮음</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-orange-600 dark:text-orange-400">높음</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">총 이자액</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-orange-600 dark:text-orange-400">1억 1,578만 원</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-green-600 dark:text-green-400">1억 820만 원</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">이자 절약</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">-</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-green-600 dark:text-green-400">약 758만 원 절약</td>
              </tr>
              <tr>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">원금 상환 속도</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">느림 (초기)</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-green-600 dark:text-green-400">빠름 (일정)</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">월 납부 예측</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2 text-green-600 dark:text-green-400">매우 쉬움</td>
                <td className="border border-slate-300 dark:border-slate-600 px-4 py-2">매달 달라짐</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">어떤 상황에서 어떤 방식이 유리한가?</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">원리금균등상환이 유리한 경우</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>초기 현금 흐름이 부족할 때:</strong> 초기 납부액이 낮아 부담이 적습니다</li>
          <li><strong>가계 예산 관리를 철저히 하고 싶을 때:</strong> 매달 납부액이 고정되어 계획 세우기 쉽습니다</li>
          <li><strong>대출 기간이 짧을 때:</strong> 단기 대출이라면 이자 차이가 크지 않습니다</li>
          <li><strong>투자 기회가 있을 때:</strong> 초기 잉여 자금을 다른 곳에 투자할 수 있습니다</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">원금균등상환이 유리한 경우</h3>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>장기 대출일 때:</strong> 상환 기간이 길수록 이자 절약 효과가 커집니다</li>
          <li><strong>초기 소득이 충분할 때:</strong> 높은 초기 납부액을 감당할 여유가 있을 때</li>
          <li><strong>대출 잔액을 빨리 줄이고 싶을 때:</strong> 원금이 더 빨리 상환됩니다</li>
          <li><strong>금리 상승이 예상될 때:</strong> 변동금리 대출에서 원금을 빨리 줄이면 이자 부담이 줄어듭니다</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">만기일시상환은 언제 쓰나?</h2>
        <p className="mb-4 leading-relaxed">
          만기일시상환은 대출 기간 동안 이자만 내고 만기에 원금 전액을 상환하는 방식입니다.
          월 납부액이 가장 낮지만, 총 이자 부담이 가장 큽니다. 전세자금대출, 단기 사업자금대출 등
          만기 내 일시 상환이 확실한 경우에 활용합니다. 개인 주택담보대출에서는 일반적으로 추천하지 않습니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">중간에 상환 방식을 바꿀 수 있나?</h2>
        <p className="mb-4 leading-relaxed">
          일반적으로 대출 실행 후 상환 방식을 변경하기는 어렵습니다. 중도상환 후 새 조건으로 재대출하는 방법이 있지만,
          중도상환수수료가 발생할 수 있습니다. 처음 대출 시 신중하게 선택하는 것이 중요합니다.
          여러 금융기관의 상품을 꼼꼼히 비교하고, 필요하다면 전문 상담을 받는 것을 권장합니다.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">대출 이자 계산 팁</h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li><strong>실질 이자율 확인:</strong> 명목 이자율과 함께 APR(연간 실효이자율)을 반드시 확인하세요</li>
          <li><strong>중도상환수수료 확인:</strong> 조기 상환 시 수수료가 얼마인지 미리 확인하세요</li>
          <li><strong>고정 vs 변동금리:</strong> 금리 상승기에는 고정금리가, 금리 하락기에는 변동금리가 유리합니다</li>
          <li><strong>가능하면 일부 조기상환:</strong> 매년 원금 일부를 추가 상환하면 이자를 크게 줄일 수 있습니다</li>
        </ul>

        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 text-slate-600 dark:text-slate-300">
          대출 이자는 &quot;보이지 않는 비용&quot;입니다. 30년간 3억 대출의 총 이자가 1억 원을 넘는다는 사실을 미리 알고 대출을 결정하는 것이 중요합니다.
        </blockquote>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold mb-3">관련 도구</h3>
        <Link
          href="/loan-calculator/"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          PickPlay 대출 이자 계산기 →
        </Link>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          원리금균등·원금균등 두 방식의 월 납부액과 총 이자를 직접 비교해보세요.
        </p>
      </div>
    </article>
  );
}
